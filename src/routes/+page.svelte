<script>
	import Logo from "$lib/components/Logo.svelte";
	import Button from "$lib/components/Button.svelte";
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

<section id="hero">
	<h1 id="hero__heading">Веб как надо</h1>
	<p id="hero__text">На Landing Factory можно заказать сайт, и не важно есть ли у Вас его дизайн,<br />
		есть ли идея для сайта - даже если ничего нет, сайт будет! Начнём? :)</p>
	<img src="/images/hero-rainbow-lazer.svg" alt="" id="hero__image">
	<Button id="hero__cta" primary>Заказать сайт</Button>
</section>


<style lang="sass">
header
	padding-block: 3rem
	display: flex
	align-items: center
	justify-content: space-between
	padding-inline-end: $page-padding

#hero
	display: flex
	align-items: center
	justify-content: center
	flex-direction: column
	height: 60svh
	text-align: center

#header-buttons
	display: flex
	align-items: center
	column-gap: 5rem

#hero__heading
	font-family: "MullerNextExpanded", sans-serif
	font-weight: 1000
	font-size: $text-3xl
	margin-block-end: 0
	line-height: 1em

:global(#hero__cta)
	margin-block-start: 1rem

#hero__image
	z-index: -1
	position: absolute
	inset: 0
</style>