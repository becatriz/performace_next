import { FormEvent, useCallback, useMemo, useState } from "react";
import { SearchResuls } from "../components/SearchResults";
import styles from "../styles/Home.module.css";

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) return;

    try {
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:3333/products?q=${search}`
      );

      const data = await response.json();

      const formatter = new Intl.NumberFormat("pr-BR", {
        style: "currency",
        currency: "BRL",
      });

      const products = data.map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          priceFormatted: formatter.format(product.price),
        };
      });

      const totalPrice = data.reduce((acc, product) => {
        return acc + product.price;
      }, 0);

      setResults({ totalPrice, data: products });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishList = useCallback(
    () => (id: number) => {
      console.log(id);
    },
    []
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          className={styles.input}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Buscar
        </button>
      </form>
      {isLoading ? (
        <p className={styles.loading} >Carregando...</p>
      ) : (
        <SearchResuls
          results={results.data}
          totalPrice={results.totalPrice}
          onAddToWishList={addToWishList}
        />
      )}
    </div>
  );
}

/**
 * ------------Fluxo de renderiza????o React------------
 * 1. Criar uma nova vers??o do componente
 * 2. Comparar a vers??o com a anterior
 * 3. Se houverem altera????es, vai atualizar o que alterou
 */

/**
 * -----------Utiliza????o do memo-----------
 * 1. Pure Functional Components: funcoes pura sao funcoes que ao passarmos algum parametro sempre retornam o mesmo resultado. Conectado a algo externo da aplicao, que pode ser gerado de forma diferente (ex: horario de acesso do usuario)
 * 2. Renders too often: componentes que s??o muito renderizados
 * 3. Re-renders with same props: renderiz????o de componente muitas vezes e com as mesmas props
 * 4. Medium to big size: componente m??dio para grande
 */

/**----------Utiliza????o useMemo---------------------
 * 1. Evitar que algo que tenha muito poder de processamento (ex: calculos), seja refeito toda vez que o componente renderizar
 * 2. Sem usememo, quando repassar a propriedade calculada para outro componente(filho), essa propriedade(variavel) sempre ocupara um novo espa??o na memoria (igualdade referencial)
 */

/**----------Utiliza????o useCallback---------------------
 * 1. Memorizar uma fun????o e n??o um valor
 * Quando existe uma funcao que sera passada de componente pra componente ate chegar no destino final(Prop Drilling)
 * Fun??ao de contexto
 */

/**
 * ------ Dynamic import (code splitting)------------
 *
 */

/**
 * --------Virtualiza????o------------
 * lib react-virtualized
 */
