<script lang="ts">
    export let date: Date | string;

	let dateObject = new Date(date);
</script>


<time datetime={dateObject.toISOString()}>
	{
		dateObject.toLocaleDateString('en-us', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}
</time>