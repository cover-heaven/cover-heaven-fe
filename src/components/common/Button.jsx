import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	Border_Secondary,
	Surface_Primary,
	Text_Tertiary
} from '../../styles/color';

const Button = ({
	width,
	height = 'auto',
	mode,
	textSize = 14,
	onClick,
	content,
	fontWeight = 600,
	isIcon,
	iconW = 0,
	iconH = 0
}) => {
	const [propObj, setPropObj] = useState({});
	useEffect(() => {
		switch (mode) {
			case 'default': {
				setPropObj({
					backgroundColor: Surface_Primary,
					color: '#FFF',
					border: `1px solid ${Surface_Primary}`,
					cursor: 'pointer',
					hoverColor: Surface_Primary,
					hoverBgColor: 'none',
					filter: 'none'
				});
				break;
			}
			case 'grayBtn': {
				setPropObj({
					backgroundColor: Border_Secondary,
					color: '#FFF',
					border: `1px solid ${Border_Secondary}`,
					cursor: 'pointer',
					hoverColor: Border_Secondary,
					filter: 'brightness(0.9 )'
				});
				break;
			}
			case 'deactivated': {
				setPropObj({
					backgroundColor: '#fff',
					color: Text_Tertiary,
					border: `1px solid ${Text_Tertiary}`,
					cursor: 'default'
				});
				break;
			}
			case 'activated': {
				setPropObj({
					backgroundColor: 'none',
					color: Surface_Primary,
					border: `1px solid ${Surface_Primary}`,
					cursor: 'default'
				});
				break;
			}
			case 'addBtn': {
				setPropObj({
					backgroundColor: 'none',
					color: Surface_Primary,
					border: `1px solid ${Surface_Primary}`,
					cursor: 'pointer',
					hoverColor: '#FFF',
					hoverBgColor: Surface_Primary,
					filter: 'none'
				});
				break;
			}
			default: {
				setPropObj({
					backgroundColor: Surface_Primary,
					color: '#FFF',
					border: 'none',
					cursor: 'pointer'
				});
				break;
			}
		}
	}, []);
	return (
		<BtnBody
			width={width}
			height={height}
			textSize={textSize}
			fontWeight={fontWeight}
			mode={mode}
			{...propObj}
			onClick={onClick}
		>
			{isIcon === true ? (
				<IconImg width={iconW} height={iconH} src={content}></IconImg>
			) : (
				content
			)}
		</BtnBody>
	);
};

export default Button;

const BtnBody = styled.div`
	/* width: 100%; */
	/* padding: 0 auto; */
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	font-size: ${(props) => props.textSize}px;
	font-weight: ${(props) => props.fontWeight};
	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.color};
	border: ${(props) => props.border};
	cursor: ${(props) => props.cursor};
	transition: all 0.1s ease-in-out;
	&:hover {
		background: ${(props) => {
			return props.mode === 'default' || props.mode === 'addBtn'
				? props.hoverBgColor
				: props.backgroundColor;
		}};
		color: ${(props) => {
			return props.mode === 'default' || props.mode === 'addBtn'
				? props.hoverColor
				: props.color;
		}};
		filter: ${(props) => props.filter};
	}
`;

const IconImg = styled.img`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
`;
