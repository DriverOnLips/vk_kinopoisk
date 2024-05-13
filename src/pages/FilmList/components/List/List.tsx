import * as React from 'react';
import { useCallback, CSSProperties, memo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { FilmFromListModel } from 'types/FilmFromList';
import styles from '../../FilmList.module.scss';
import FilmItem from '../FilmItem/FilmItem';

interface GridItemProps {
	columnIndex: number;
	rowIndex: number;
	style: CSSProperties;
}

type ListProps = {
	filmList: FilmFromListModel[];
};

const List: React.FC<ListProps> = ({ filmList }) => {
	const getColumnCount = useCallback(() => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 600) {
			return 1;
		} else if (screenWidth < 1000) {
			return 2;
		} else {
			return 3;
		}
	}, []);

	const setItemHeight = useCallback(() => {
		return window.innerWidth > 800 ? 650 : 600;
	}, []);

	const setGridHeight = useCallback(() => {
		const rootFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		);
		const remInPixels = rootFontSize * 5;
		const screenHeight = window.innerHeight;

		return window.innerWidth > 300
			? screenHeight - remInPixels - 207
			: screenHeight - remInPixels - 242;
	}, []);

	return (
		<Grid
			className={`${styles.film_list__gallery__grid} virtualized_list`}
			columnCount={getColumnCount()}
			columnWidth={() => {
				const columnCount = getColumnCount();
				return window.innerWidth / columnCount - 20;
			}}
			height={setGridHeight()} // Высота списка
			rowCount={Math.ceil(filmList.length / getColumnCount())}
			rowHeight={setItemHeight} // Высота элемента
			width={window.innerWidth - 30} // Ширина списка
			style={{ overflowX: 'hidden' }}
		>
			{({ columnIndex, rowIndex, style }: GridItemProps) => {
				const index = rowIndex * getColumnCount() + columnIndex;
				const item = filmList[index];
				if (!item) return null;

				return (
					<div style={style}>
						<FilmItem film={item} />
					</div>
				);
			}}
		</Grid>
	);
};

export default memo(List);
