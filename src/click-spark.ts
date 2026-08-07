const CLICK_SPARK_CANVAS_CLASS = "shadcn-click-spark-canvas";
const SPARK_COUNT = 8;
const SPARK_DURATION = 400;
const SPARK_SIZE = 10;
const SPARK_RADIUS = 15;
const MAX_ACTIVE_SPARKS = 128;

type Spark = {
	x: number;
	y: number;
	angle: number;
	startTime: number;
};

function isReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setupClickSpark(): () => void {
	const canvas = document.createElement("canvas");
	canvas.className = CLICK_SPARK_CANVAS_CLASS;
	canvas.setAttribute("aria-hidden", "true");
	document.body.appendChild(canvas);

	const context = canvas.getContext("2d");
	if (!context) {
		canvas.remove();
		return () => undefined;
	}

	const sparks: Spark[] = [];
	let animationFrame: number | null = null;
	let viewportWidth = window.innerWidth;
	let viewportHeight = window.innerHeight;
	let devicePixelRatio = 1;

	const resize = () => {
		devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
		viewportWidth = window.innerWidth;
		viewportHeight = window.innerHeight;
		canvas.width = Math.round(viewportWidth * devicePixelRatio);
		canvas.height = Math.round(viewportHeight * devicePixelRatio);
		canvas.style.width = `${viewportWidth}px`;
		canvas.style.height = `${viewportHeight}px`;
		context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
	};

	const draw = (timestamp: number) => {
		animationFrame = null;
		context.clearRect(0, 0, viewportWidth, viewportHeight);

		const activeSparks = sparks.filter((spark) => timestamp - spark.startTime < SPARK_DURATION);
		sparks.splice(0, sparks.length, ...activeSparks);

		if (sparks.length === 0) {
			return;
		}

		const rootStyle = getComputedStyle(document.documentElement);
		const primary = rootStyle.getPropertyValue("--primary").trim() || "#fff";
		context.lineWidth = 2;
		context.lineCap = "round";

		for (const spark of sparks) {
			const progress = Math.min(1, (timestamp - spark.startTime) / SPARK_DURATION);
			const eased = progress * (2 - progress);
			const distance = eased * SPARK_RADIUS;
			const lineLength = SPARK_SIZE * (1 - eased);
			const x1 = spark.x + distance * Math.cos(spark.angle);
			const y1 = spark.y + distance * Math.sin(spark.angle);
			const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
			const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

			context.globalAlpha = 1 - progress;
			context.strokeStyle = primary;
			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();
		}

		context.globalAlpha = 1;
		animationFrame = window.requestAnimationFrame(draw);
	};

	const scheduleDraw = () => {
		if (animationFrame == null) {
			animationFrame = window.requestAnimationFrame(draw);
		}
	};

	const onPointerDown = (event: PointerEvent) => {
		if (event.button !== 0 || !event.isPrimary || isReducedMotion()) {
			return;
		}

		const startTime = performance.now();
		for (let index = 0; index < SPARK_COUNT; index += 1) {
			sparks.push({
				x: event.clientX,
				y: event.clientY,
				angle: (2 * Math.PI * index) / SPARK_COUNT,
				startTime,
			});
		}
		if (sparks.length > MAX_ACTIVE_SPARKS) {
			sparks.splice(0, sparks.length - MAX_ACTIVE_SPARKS);
		}
		scheduleDraw();
	};

	resize();
	window.addEventListener("resize", resize);
	document.addEventListener("pointerdown", onPointerDown, true);

	return () => {
		if (animationFrame != null) {
			window.cancelAnimationFrame(animationFrame);
		}
		window.removeEventListener("resize", resize);
		document.removeEventListener("pointerdown", onPointerDown, true);
		sparks.length = 0;
		canvas.remove();
	};
}
