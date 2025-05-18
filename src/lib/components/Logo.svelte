<a href="/" id="logo">
	<span id="logo__trademark">®</span>
	<span id="logo__top-text">Landing</span>
	<span id="logo__bottom-text">Factory</span>
</a>

<style lang="sass">
$color-lines-shift: 0.33rem

#logo
	transition: 400ms cubic-bezier(0.1, 2.25, 0.8, 1)
	background: $black
	color: $white
	display: inline-flex
	align-items: flex-end
	flex-direction: column
	padding-block: 0.35rem
	padding-inline-start: 10rch
	padding-inline-end: $color-lines-shift
	text-decoration: none

	&:hover
		box-shadow: $color-lines-shift * 1 0 0 $purple, $color-lines-shift * 2 0 0 $orange, $color-lines-shift * 3 0 0 $green
		padding-inline-start: 12rch

	&:active
		box-shadow: 0 0 0 $purple, 0 0 0 $orange, 0 0 0 $green
		padding-inline-start: 8rch
		opacity: 0.9

#logo__trademark
	font-family: "MullerNextExpanded", sans-serif
	font-size: $text-xs

#logo__top-text
	font-family: "MullerNextExpanded", sans-serif
	font-weight: 600

#logo__bottom-text
	font-family: 'MullerNextExtraCond', sans-serif
	font-weight: 400
	font-style: italic
	letter-spacing: 0.0625em

#logo__top-text, #logo__bottom-text
	font-size: $text-l
	text-transform: uppercase
	line-height: 0.9em
</style>