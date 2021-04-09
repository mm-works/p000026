import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import * as Quill from "quill";

const ReactQuill = dynamic(
	import('react-quill'),
	{ ssr: false }
);

export interface UnprivilegedEditor {
	getLength(): number;
	getText(index?: number, length?: number): string;
	getHTML(): string;
	getBounds(index: number, length?: number): Quill.BoundsStatic;
	getSelection(focus?: boolean): Quill.RangeStatic;
	getContents(index?: number, length?: number): Quill.DeltaStatic;
}

export interface ComponentProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	readOnly?: boolean;
	value?: string | Quill.Delta;
	defaultValue?: string | Quill.Delta;
	placeholder?: string;
	tabIndex?: number;
	bounds?: string | HTMLElement;
	scrollingContainer?: string | HTMLElement;
	onChange?: (
		content: string,
		delta: Quill.Delta,
		source: Quill.Sources,
		editor: UnprivilegedEditor
	) => void;
	onChangeSelection?: (
		range: Quill.RangeStatic,
		source: Quill.Sources,
		editor: UnprivilegedEditor
	) => void;
	onFocus?: (
		range: Quill.RangeStatic,
		source: Quill.Sources,
		editor: UnprivilegedEditor
	) => void;
	onBlur?: (
		previousRange: Quill.RangeStatic,
		source: Quill.Sources,
		editor: UnprivilegedEditor
	) => void;
	onKeyPress?: React.EventHandler<any>;
	onKeyDown?: React.EventHandler<any>;
	onKeyUp?: React.EventHandler<any>;
	formats?: string[];
	children?: React.ReactElement<any>;
	preserveWhitespace?: boolean;

	/** @deprecated
	 * The `toolbar` prop has been deprecated. Use `modules.toolbar` instead.
	 * See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.
	 * */

	toolbar?: never;
	/** @deprecated
	 * The `styles` prop has been deprecated. Use custom stylesheets instead.
	 * See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100
	 */

	styles?: never;
	/**
	 * @deprecated
	 * The `pollInterval` property does not have any effect anymore.
	 * You can safely remove it from your props.
	 * See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.
	 */
	pollInterval?: never;
}

export default function RichEditor({ value, onChange, defaultValue }: ComponentProps) {
	const toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'],        // toggled buttons
		['blockquote', 'code-block'],

		[{ 'header': 1 }, { 'header': 2 }],               // custom button values
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
		[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
		[{ 'direction': 'rtl' }],                         // text direction

		[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

		[{ 'color': [] as string[] }, { 'background': [] as string[] }],          // dropdown with defaults from theme
		[{ 'font': [] as string[] }],
		[{ 'align': [] as string[] }],

		['clean'],                                         // remove formatting button
		['image', 'code-block']
	];
	return <ReactQuill defaultValue={defaultValue} value={value} theme="snow" modules={{ toolbar: toolbarOptions }} onChange={onChange}></ReactQuill>;
}
