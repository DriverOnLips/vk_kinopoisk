import * as React from 'react';
import { useCallback, CSSProperties, memo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { FilmFromListModel } from 'types/FilmFromList';
import FilmItem from '../FilmItem/FilmItem';

interface GridItemProps {
	columnIndex: number;
	rowIndex: number;
	style: CSSProperties;
}

type ListProps = {
	filmList: FilmFromListModel[];
	increase: boolean;
};

const List: React.FC<ListProps> = ({ filmList, increase }) => {
	const getColumnCount = () => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 650) {
			return 1;
		} else if (screenWidth < 1200) {
			return 2;
		} else {
			return 3;
		}
	};

	const setItemHeight = useCallback(() => {
		const screenWidth = window.innerWidth;
		const breakpoints: { [key: number]: number } = {
			350: 550,
			500: 600,
			650: 700,
			900: 600,
			1200: 700,
			1400: 600,
			1700: 650,
			2000: 750,
		};

		const sortedBreakpoints = Object.keys(breakpoints)
			.map(Number)
			.sort((a, b) => a - b);
		const currentBreakpoint = sortedBreakpoints.find((bp) => screenWidth < bp);

		if (currentBreakpoint !== undefined) {
			return breakpoints[currentBreakpoint];
		}

		return 800;
	}, []);

	const setGridHeight = () => {
		const rootFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		);
		const remInPixels = rootFontSize * 5;
		const screenHeight = window.innerHeight;

		return increase
			? screenHeight - 215 - remInPixels
			: screenHeight - 420 - remInPixels;
	};

	return (
		<Grid
			// className={`${styles.recipe_list__container}`}
			columnCount={getColumnCount()}
			columnWidth={() => {
				const columnCount = getColumnCount();
				return window.innerWidth / columnCount - 20;
			}}
			height={setGridHeight()} // Высота списка
			rowCount={Math.ceil(filmList.length / getColumnCount())}
			rowHeight={setItemHeight} // Высота элемента
			width={window.innerWidth - 4} // Ширина списка
			// style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
		>
			{({ columnIndex, rowIndex, style }: GridItemProps) => {
				const index = rowIndex * getColumnCount() + columnIndex;
				const item = filmList[index];
				if (!item) return null;

				return (
					<div
						style={style}
						// className={styles.recipe_list__container_item}
					>
						<FilmItem film={item} />
					</div>
				);
			}}
		</Grid>
	);
};

export default memo(List);
