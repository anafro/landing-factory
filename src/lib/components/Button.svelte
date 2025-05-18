<script lang="ts">
	import type {Snippet} from "svelte";
	import type {HTMLAttributes} from "svelte/elements";

	interface Properties extends Partial<HTMLAttributes<HTMLAnchorElement>> {
		primary?: boolean;
		href?: string;
		children: Snippet;
	}

	const {
		primary = false,
		href = "#",
		children,
		...rest
	}: Properties = $props();
</script>

<a {href} class="button" class:primary {...rest}>
	{@render children()}
</a>

<style lang="sass">
$color-lines-shift: 0.3rem

.button
	text-decoration: none
	color: $black
	font-weight: 600
	transition: 400ms cubic-bezier(0.1, 2.25, 0.8, 1)

	&:not(.primary)
		position: relative

		&:before
			transition: inherit
			content: ""
			display: inline-block
			width: 100%
			height: 1px
			background: transparentize($purple, 0.40)
			position: absolute
			bottom: -0.33rem

	&:not(.primary):hover
		color: $purple
		transform: scale(1.10)

		&:before
			background: $purple
			animation: button-secondary-before 300ms cubic-bezier(0.1, 1.25, 0.8, 1)
			@keyframes button-secondary-before
				from
					width: 0
					left: 50%
				to
					width: 100%
					left: 0


	&.primary
		background: $black
		color: $white
		padding-block: 0.5rem
		padding-inline: 0.75rem
		transition: 250ms cubic-bezier(0.1, 2.25, 0.8, 1)

		&:hover
			box-shadow: $color-lines-shift * 1 $color-lines-shift * 1 0 $orange, $color-lines-shift * 2 $color-lines-shift * 2 0 $green
			transform: scale(1.10) translateX(-$color-lines-shift) translateY(-$color-lines-shift)
			background-image: linear-gradient(125deg, $black 0%, $black 20%, $purple 40%, mix($purple, $white, 65%) 50%, $purple 70%, $purple 100%)
			background-size: 600% 100%
			background-repeat: no-repeat
			animation: button-primary-hover 500ms ease-out forwards
			@keyframes button-primary-hover
				0%
					background-position: left center

				100%
					background-position: right center
</style>