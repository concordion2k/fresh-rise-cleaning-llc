// Copy that mixes text with links, rendered by components/RichText.vue.

/** A run of text, or a link inside it. `to` = in-site route, `href` = anything else. */
export type Inline = string | { text: string; href: string } | { text: string; to: string };

/** Plain text, or text mixed with links. */
export type Rich = string | Inline[];
