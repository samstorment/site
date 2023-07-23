<script lang="ts">
    export let date: Date | string;

	let dateObject = new Date(date);

	let d = dateObject.getDate() + 1;
	let m = dateObject.getMonth();
	let yyyy = dateObject.getFullYear();

	let months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

	let month = months[m];
</script>


<time datetime={dateObject.toISOString()}>
	{month} {d}, {yyyy}
</time>