<div id="logo">
	<span id="logo__trademark">®</span>
	<span id="logo__top-text">Landing</span>
	<span id="logo__bottom-text">Factory</span>
</div>

<style lang="sass">
$color-lines-shift: 0.33rem

#logo
	background: $black
	color: $white
	display: inline-flex
	align-items: flex-end
	flex-direction: column
	padding-block: 0.35rem
	padding-inline-start: 10rch
	padding-inline-end: $color-lines-shift
	box-shadow: $color-lines-shift * 1 0 0 $purple, $color-lines-shift * 2 0 0 $orange, $color-lines-shift * 3 0 0 $green

#logo__trademark
	font-family: "MullerNextExpanded", sans-serif
	font-size: $text-xs

#logo__top-text
	font-family: "MullerNextExpanded", sans-serif
	font-weight: 600

#logo__bottom-text
	font-family: "MullerNextExtraCond", sans-serif
	font-style: italic
	font-weight: 500

#logo__top-text, #logo__bottom-text
	font-size: $text-l
	text-transform: uppercase
	line-height: 0.9em
</style>