import { useEffect, useState } from "react";
import produtos from "../services/produtos";

const Home = () => {
  interface Produto {
    produto_id: number;
    descricao: string;
    preco: string;
    imagem: string | null;
  }

  const [lista, setLista] = useState<Produto[]>([]);
  const [produtoFiltrado, setProdutoFiltrado] = useState("");

  useEffect(() => {
    setLista(lista);
  }, []);

  const getProduct = (produtoNome: string) => {
    setProdutoFiltrado(produtoNome);

    if (produtoNome.trim() === "") {
      setLista(lista);
      return;
    }

    const buscaProduto = produtos.filter((item) =>
      item.descricao.toLowerCase().includes(produtoNome.toLowerCase())
    );
    setLista(buscaProduto);
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold pt-10 px-4">
        Produtos Supermercado
      </h1>
      <div className="container mx-auto px-4 pt-8">
        <input
          type="text"
          placeholder="Digite o nome do produto"
          className="border border-white rounded-sm py-2 px-4 w-full"
          onChange={(e) => getProduct(e.target.value)}
          value={produtoFiltrado}
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-stretch gap-8 pt-10 px-4">
        {lista.length > 0 ? (
          lista.map((produto) => (
            <div
              key={produto.produto_id}
              className="flex flex-col justify-between items-center gap-8 bg-white p-4"
            >
              <h2 className="text-black font-bold text-2xl text-center">
                {produto.descricao}
              </h2>
              <img
                src={`https://produtos.vipcommerce.com.br/250x250/${produto.imagem}`}
                alt={produto.descricao}
              />
              <h4 className="bg-green-700 px-4 py-2 rounded-md w-full text-center">
                R$<span>{produto.preco}</span>
              </h4>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado!</p>
        )}
      </div>
    </>
  );
};

export default Home;
