export interface AddProductToWishlistProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

import styles from "./styles.module.css";

export function AddProductToWishlist({
  onAddToWishList,
  onRequestClose,
}: AddProductToWishlistProps) {
  return (
    <>
      <p>Desja adicionar aos favorios?</p>
      <div className={styles.containerContent}>
      <button className={styles.button} onClick={onAddToWishList}>
        Sim
      </button>
      <button className={styles.button} onClick={onRequestClose}>
        Não
      </button>

      </div>
    </>
  );
}
