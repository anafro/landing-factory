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
.button
	text-decoration: none
	color: $black
	font-weight: 600
	&.primary
		background: $black
		color: $white
		padding-block: 0.5rem
		padding-inline: 0.75rem
</style>