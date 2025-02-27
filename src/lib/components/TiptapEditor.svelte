<script lang="ts">
	import { onMount } from "svelte";
	import { Editor } from "@tiptap/core";
	import StarterKit from "@tiptap/starter-kit";
	import TextStyle from "@tiptap/extension-text-style";
	import Color from "@tiptap/extension-color";
	import Underline from "@tiptap/extension-underline";
	import Heading from "@tiptap/extension-heading";
	import Link from "@tiptap/extension-link";
	import TextAlign from "@tiptap/extension-text-align";

	let editor: Editor | null = null;
	let editorContainer: HTMLElement | null = null;
	let activeColor: string | null = null;

	onMount(() => {
		if (editorContainer) {
			editor = new Editor({
				element: editorContainer,
				extensions: [
					StarterKit.configure({
						heading: false // Отключаем встроенные заголовки
					}),
					TextStyle,
					Color,
					Underline,
					Heading.configure({
						levels: [1, 2, 3]
					}),
					Link.configure({
						openOnClick: true,
					}),
					TextAlign.configure({
						types: ["heading", "paragraph"]
					})
				],
				content: `<p>Начни вводить текст...</p>`,
			});
		}

		return () => {
			editor?.destroy();
			editor = null;
		};
	});

	// ✅ Тоггл цвета (при повторном нажатии сбрасывает цвет)
	function toggleColor(color: string) {
		if (activeColor === color) {
			editor?.chain().focus().unsetColor().run();
			activeColor = null;
		} else {
			editor?.chain().focus().setColor(color).run();
			activeColor = color;
		}
	}

	// ✅ Вставка Spintax
	function insertSpintax() {
		editor?.commands.insertContent("{Текст1|Текст2|Текст3}");
	}

	// ✅ Вставка ссылки
	function insertLink() {
		const url = prompt("Введите URL:");
		if (url) {
			editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
		}
	}

	// ✅ Удаление ссылки
	function removeLink() {
		editor?.chain().focus().unsetLink().run();
	}

	// ✅ Выравнивание текста – для подавления ошибки используем приведение к any
	function setTextAlign(align: "left" | "center" | "right") {
		(editor as Editor)?.chain().focus().setTextAlign(align).run();
	}

	// ✅ Toggle Heading – типизируем уровень как литеральный тип
	function toggleHeading(level: 1 | 2 | 3) {
		editor?.chain().focus().toggleHeading({ level }).run();
	}
</script>

<div class="editor_toolbar">
	<!-- Кнопки заголовков -->
	<button class="editor_toolbar_button" class:active={editor?.isActive('heading', { level: 1 })} on:click={() => toggleHeading(1)}>H1</button>
	<button class="editor_toolbar_button" class:active={editor?.isActive('heading', { level: 2 })} on:click={() => toggleHeading(2)}>H2</button>
	<button class="editor_toolbar_button" class:active={editor?.isActive('heading', { level: 3 })} on:click={() => toggleHeading(3)}>H3</button>

	<!-- Остальные кнопки -->
	<button class="editor_toolbar_button" class:active={editor?.isActive("bold")} on:click={() => editor?.chain().focus().toggleBold().run()}>B</button>
	<button class="editor_toolbar_button" class:active={editor?.isActive("italic")} on:click={() => editor?.chain().focus().toggleItalic().run()}>I</button>
	<button class="editor_toolbar_button" class:active={editor?.isActive("underline")} on:click={() => editor?.chain().focus().toggleUnderline().run()}>U</button>

	<button class="editor_toolbar_button" on:click={insertSpintax}>Spintax</button>

	<!-- Кнопки вставки и удаления ссылки -->
	<button class="editor_toolbar_button" on:click={insertLink}>🔗 Вставить ссылку</button>
	<button class="editor_toolbar_button" on:click={removeLink}>🚫 Удалить ссылку</button>

	<!-- Кнопки выравнивания -->
	<button class="editor_toolbar_button" class:active={editor?.isActive({ textAlign: "left" })} on:click={() => setTextAlign("left")}>⬅️</button>
	<button class="editor_toolbar_button" class:active={editor?.isActive({ textAlign: "center" })} on:click={() => setTextAlign("center")}>🔽</button>
	<button class="editor_toolbar_button" class:active={editor?.isActive({ textAlign: "right" })} on:click={() => setTextAlign("right")}>➡️</button>

	<!-- Кнопки выбора цвета -->
	<button class="editor_toolbar_button" class:active={activeColor === "#FFA07A"} on:click={() => toggleColor("#FFA07A")}>🔥</button>
	<button class="editor_toolbar_button" class:active={activeColor === "#98FB98"} on:click={() => toggleColor("#98FB98")}>🍀</button>
	<button class="editor_toolbar_button" class:active={activeColor === "#FF69B4"} on:click={() => toggleColor("#FF69B4")}>💖</button>
	<button class="editor_toolbar_button" class:active={activeColor === "#FFD700"} on:click={() => toggleColor("#FFD700")}>🌟</button>
</div>

<div class="editor_container" bind:this={editorContainer}></div>
