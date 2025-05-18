<script lang="ts">
	import Logo from "$lib/components/Logo.svelte";
	import Button from "$lib/components/Button.svelte";
	import {onMount} from "svelte";

	let hero: HTMLElement;
	let heroCanvas: HTMLCanvasElement;

	onMount(() => {
		const fragmentShaderSource = `
		    precision highp float;
		    uniform float iTime;
		    uniform vec2 iResolution;

		    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
			    const vec4 purple  = vec4(0.2431, 0.0,    1.0,    1.0); // #3E00FF
			    const vec4 orange  = vec4(1.0,    0.3059, 0.0,    1.0); // #FF4E00
			    const vec4 green   = vec4(0.0,    1.0,    0.0471, 1.0); // #00FF0C
			    const vec4 cyan    = vec4(0.0,    1.0,    1.0,    1.0); // #00FFFF
			    const vec4 yellow  = vec4(1.0,    1.0,    0.0,    1.0); // #FFFF00
			    const vec4 magenta = vec4(1.0,    0.0,    1.0,    1.0); // #FF00FF
			    const vec4 white   = vec4(1.0,    1.0,    1.0,    1.0); // #FF00FF


			    vec2 uv = fragCoord.xy / 500.0;
			    float speed = 1.300;
			    float lines = 14.0;
			    float waves = 0.9;
			    float hardness = 900.0;
			    float t = speed * iTime;
			    // float alpha = pow(sin((iTime * speed + uv.x * uv.y + sin(iTime * (uv.x + iTime / 5.) / 100. + (uv.y + iTime))) * fraction) * 0.5 + 0.5, hardness);
			    float alpha = pow(sin((uv.y + sin(uv.x * waves + t)) * lines) / 2. + .5, hardness);
			    float beta = pow(sin(((1. - uv.y) + sin((1. - uv.x) * waves + t)) * lines) / 2. + .5, hardness);
			    fragColor = (purple * alpha + white * (1. - alpha)) * (orange * beta + white * (1. - beta));
		    }

		    void main() {
		        mainImage(gl_FragColor, gl_FragCoord.xy);
		    }
		`;

		const gl = heroCanvas.getContext('webgl');

		if (gl === null) {
			throw new Error(`There's no WebGL context in canvas.`);
		}

		heroCanvas.width = hero.clientWidth;
		heroCanvas.height = hero.clientHeight;

		const vertexShaderSource = `
			attribute vec4 position;
			void main() {
				gl_Position = position;
			}
		`;

		function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
			const shader = gl.createShader(type);

			if (shader === null) {
				throw new Error(`Shader type ${type} is unsupported.`);
			}

			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error();
				throw new Error(gl.getShaderInfoLog(shader) ?? '(Null compilation status)');
			}

			return shader;
		}

		const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

		const program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1, -1,  1, -1, -1,  1,
			-1,  1,  1, -1,  1,  1
		]), gl.STATIC_DRAW);

		const positionLocation = gl.getAttribLocation(program, "position");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		const iResolution = gl.getUniformLocation(program, "iResolution");
		const iTime = gl.getUniformLocation(program, "iTime");

		function render(gl: WebGLRenderingContext, time: number) {
			heroCanvas.width = hero.clientWidth;
			heroCanvas.height = hero.clientHeight;
			gl.viewport(0, 0, heroCanvas.width, heroCanvas.height);
			time *= 0.001;
			gl.viewport(0, 0, heroCanvas.width, heroCanvas.height);
			gl.uniform2f(iResolution, heroCanvas.width, heroCanvas.height);
			gl.uniform1f(iTime, time);
			gl.drawArrays(gl.TRIANGLES, 0, 6);

			requestAnimationFrame(time => render(gl, time));
		}

		render(gl, 0);
	});
</script>


<header>
	<Logo></Logo>
	<div id="header-buttons">
		<Button>Связаться с разработчиком</Button>
		<Button>Создать сайт из шаблона</Button>
		<Button>Законченные работы</Button>
		<Button primary>Заказать сайт</Button>
	</div>
</header>

<section id="hero" bind:this={hero}>
	<canvas id="hero__canvas" bind:this={heroCanvas}></canvas>
	<h1 id="hero__heading">Веб как надо</h1>
	<p id="hero__text">На Landing Factory можно заказать сайт, и не важно есть ли у Вас его дизайн,<br />
		есть ли идея для сайта - даже если ничего нет, сайт будет! Начнём? :)</p>
	<Button id="hero__cta" primary>Заказать сайт</Button>
</section>

<section id="portfolio">
	<h2 id="portfolio__heading">Создано на Landing Factory</h2>

	<div id="portfolio__cards">
		{#each {length: 8} as _, i}
			<div class="portfolio__card">
				<div class="portfolio__card-ui">
					<h3 class="portfolio__card-title">Izotope Incorporated</h3>
					<p class="portfolio__card-description">
						Какой-то текст, описывающий компанию
						или человека, заказавший этот сайт
					</p>

					<p class="portfolio__card-done-in">Сделано за {i + 1} дней</p>

					<Button>Посмотреть</Button>
				</div>

				<img class="portfolio__card-img" src="https://placehold.co/600x800" alt="Not found">
			</div>
		{/each}
	</div>
</section>


<style lang="sass">
header
	padding-block: 3rem
	display: flex
	align-items: center
	justify-content: space-between
	padding-inline-end: $page-padding

section
	padding-inline: $page-padding

#hero
	display: flex
	align-items: start
	justify-content: center
	flex-direction: column
	padding-block: 6rem
	position: relative

#hero__canvas
	position: absolute
	inset: 0
	z-index: -1
	opacity: 0.2

#header-buttons
	display: flex
	align-items: center
	column-gap: 3rem

#hero__heading
	font-family: "MullerNextExpanded", sans-serif
	font-weight: 400
	font-size: $text-3xl
	margin-block-end: 0
	line-height: 0.8em

:global(#hero__cta)
	margin-block-start: 1rem

#portfolio
	margin-block: 11rem

#portfolio__heading
	margin-block-end: 2rem

#portfolio__cards
	display: grid
	grid-template-columns: repeat(3, 1fr)
	gap: 1rem

.portfolio__card
	border: #EEEEEE 2px solid
	display: flex
	grid-template-columns: repeat(2, 1fr)
	height: 28rch

.portfolio__card-ui
	display: flex
	flex-direction: column
	align-items: start
	justify-content: center
	padding: 2rem

.portfolio__card-done-in
	margin-block-start: 0
	margin-block-end: 2rem
	color: #AAAAAA

:global(portfolio__card-button)
	margin-block-start: 1rem

.portfolio__card-img
	width: 50%
	max-width: 50%
	object-fit: cover
</style>