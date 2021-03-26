import { Button as BaseButton } from '@geist-ui/react';
import { ButtonProps } from '@geist-ui/react/dist/button/button';

/**
 * 统一风格的Button按钮
 */
export default function Button(props: Partial<ButtonProps>) {
	return <BaseButton auto ghost type='success-light' {...props}></BaseButton>;
}
