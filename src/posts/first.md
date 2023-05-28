---
title: First Post
description: The description of my post
date: 2023-02-04
categories: [ Svelte, SvelteKit, TypeScript, JavaScript ]
draft: false
---

Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in SvelteKit.

Here is a [link](#paragraph)

## Headings 

The following HTML `<h1>`—`<h6>` elements represent six levels of section
headings. `<h1>` is the highest section level while `<h6>` is the lowest.

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum,
voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma
dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as
cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin
porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur?
Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit
ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda
veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore
eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata
tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne
sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Images

![This is a placeholder image description](/placeholder-social.jpg)

## Blockquotes

The blockquote element represents content that is quoted from another source,
optionally with a citation which must be within a `footer` or `cite` element,
and optionally with in-line changes such as annotations and abbreviations.

### Blockquote without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.\
> **Note** that you can use _Markdown syntax_ within a blockquote.

### Blockquote with attribution

> Don't communicate by sharing memory, share memory by communicating.<br/> —
> <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's
[talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November
18, 2015.

## Tables

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Code Blocks

```html:src/app.html__del:5__ins:6,7__mark:11
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Example HTML5 Document</title>
        <title>A Better Title</title>
        <meta property="og:title" content="A Better Title" />
    </head>
    <body>
        <p>Test</p>
        <p>An extremely long line inside of a code block to test that the pre element scrolls on overflow</p>
    </body>
</html>
```

## A Quick Little C# printf

We use string interpolation 

```c#:program.cs
var name = "Sam";
Console.WriteLine($"Hi {name}")
```

```typescript
function fib(n: number) {
    if (n === 0 || n === 1) return n;
    return fib(n - 2) + fib(n - 1);
}

function pow(n: number, x: number) {
    if (n === 0) return 1;
    return pow(n, n - 1) * n;
}

function factorial(n: number) {
    if (n === 0) return 1;
    return factorial(n - 1) * n;
}
```

## List Types

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- List item
- Another item
- And another item

### Nested list

- Fruit
    - Apple
    - Orange
    - Banana
- Dairy
    - Milk
    - Cheese

## Other Elements — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Delete</kbd> to end the session.

Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and
other small creatures.
