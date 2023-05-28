import { browser } from '$app/environment';
import { getTheme } from '$lib/util/theme.js';

export async function load() {
    let theme = "light";

    if (browser) theme = getTheme();

    return { theme };
}

