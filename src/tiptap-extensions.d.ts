/* eslint-disable @typescript-eslint/no-unused-vars */
import { Commands } from '@tiptap/core';


declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		textAlign: {
			/**
			 * Устанавливает выравнивание текста: "left", "center" или "right"
			 */
			setTextAlign: (alignment: "left" | "center" | "right") => ReturnType;
			/**
			 * Сбрасывает выравнивание текста
			 */
			unsetTextAlign: () => ReturnType;
		}
	}
}
