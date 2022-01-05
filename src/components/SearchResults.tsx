import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";
import styles from "./styles.module.css";

type Products = {
  id: number;
  price: number;
  priceFormatted: number;
  title: string;
};

interface SearchResultsProps {
  totalPrice: number;
  results: Array<Products>;
  onAddToWishList: (id: number) => void;
}

export function SearchResuls({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
        product={results[index]}
        onAddToWishList={onAddToWishList}
      />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2>{`Price ${totalPrice}`}</h2>
      <List
        height={600}
        rowHeight={150}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />
    </div>
  );
}
