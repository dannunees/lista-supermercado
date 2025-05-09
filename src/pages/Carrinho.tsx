import { useEffect, useState } from "react";

type ItemCarrinho = {
  id: number;
  nome: string;
  valor: string;
  imagem: string | null;
  quantidade: number;
};

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  // Carregar do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("carrinho");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCarrinho(
          parsed.map((item: any) => ({
            ...item,
            quantidade: item.quantidade ?? 1,
          }))
        );
      } catch (error) {
        console.error("Erro ao ler o carrinho:", error);
        setCarrinho([]);
      }
    }
  }, []);

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  // Aumentar quantidade
  const aumentarQuantidade = (id: number) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  // Diminuir quantidade
  const diminuirQuantidade = (id: number) => {
    setCarrinho(
      (prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
          )
          .filter((item) => item.quantidade > 0) // Remove se a quantidade for 0
    );
  };

  // Remover item
  const removerItem = (id: number) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  // Limpar todo o carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Calcular total
  const total = carrinho.reduce(
    (acc, item) => acc + parseFloat(item.valor) * item.quantidade,
    0
  );

  return (
    <div className="container mx-auto px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      {carrinho.length > 0 ? (
        <>
          <ul className="space-y-4">
            {carrinho.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  {item.imagem && (
                    <img
                      src={`https://produtos.vipcommerce.com.br/250x250/${item.imagem}`}
                      alt={item.nome}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <div>
                    <h2 className="font-bold text-black">{item.nome}</h2>
                    <p className="text-black">
                      Preço unitário: R$ {item.valor}
                    </p>
                    <p className="text-black">Quantidade: {item.quantidade}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => diminuirQuantidade(item.id)}
                      className="bg-yellow-500 text-white px-2 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => aumentarQuantidade(item.id)}
                      className="bg-blue-600 text-white px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-sm text-red-600 underline"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold mb-2">
              Total: R$ {total.toFixed(2)}
            </p>
            <button
              onClick={limparCarrinho}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Limpar Carrinho
            </button>
          </div>
        </>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
};

export default Carrinho;
