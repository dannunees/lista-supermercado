import { useEffect, useState } from "react";

const Produtos = () => {
  interface ProdutosProps {
    id: number;
    title: string;
    image: string;
    description: string;
    price: string;
  }

  const [produtos, setProdutos] = useState<ProdutosProps[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log(data);
      setProdutos(data);
    };

    getProducts();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-4xl text-center font-bold">Página de Produtos!</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-stretch gap-6">
          {produtos.map((produto) => (
            <div
              className="bg-white flex items-center flex-col justify-between p-6 gap-4"
              key={produto.id}
            >
              <h2 className="text-2xl font-bold text-black text-center">
                {produto.title}
              </h2>
              <img
                className="max-w-[200px] mx-auto"
                src={produto.image}
                alt=""
              />
              <h4 className="text-green-500 text-2xl">${produto.price}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Produtos;
