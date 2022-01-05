import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
import lodash from "lodash"

// import { AddProductToWishlist } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import("./AddProductToWishlist").then(
    (mod) => mod.AddProductToWishlist
  );
},
 {
   loading: () => <p>Carregando...</p>
 }
);

import styles from "./styles.module.css";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: number;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

// Importar funcao somente quando for utilizar 
// async function showFormattedDate(){
//   const { format } = await import("date-fns")

//   format()
// }

// shallow compare -> comparação rasa / igualdade referencial

export function ProductItemComponent({
  product,
  onAddToWishList,
}: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button
        onClick={() => setIsAddingToWishlist(true)}
        className={styles.button}
      >
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // Comparacao profunda, custa poder de processamento - usar com cuidado
    //Object.is(prevProps.product, nextProps.product)
    
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);

/**
 * memo: evita que a primeira(Criar uma nova versão do componente) instrucao de renderezacao seja executada, caso
 * nenhuma propriedade do componente tenha sido alterada
 *
 * "Toda vez que o componente pai é alterado os filhos também serão" => memo evita isso. Se nada mudou
 * entao nao sera criado uma nova versao do componente
 */
