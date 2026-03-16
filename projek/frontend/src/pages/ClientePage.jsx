import { useEffect, useMemo, useState } from "react";
import { createOrder, fetchMenu } from "../services/api";
import "./ClientePage.css";

const CATEGORY_ORDER = [
  { key: "entradas", label: "Entradas" },
  { key: "sopas", label: "Sopas" },
  { key: "carne", label: "Carne" },
  { key: "peixe", label: "Peixe" },
  { key: "sobremesa", label: "Sobremesa" },
];

function ClientePage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});
  const [tableNumber, setTableNumber] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successInfo, setSuccessInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenu();
        setMenuItems(data);
      } catch (err) {
        setError("Não foi possível carregar o menu.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  useEffect(() => {
    if (!successInfo) return;

    const timeoutId = setTimeout(() => {
      setSuccessInfo(null);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [successInfo]);

  function increaseQuantity(itemId) {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  }

  function decreaseQuantity(itemId) {
    setQuantities((prev) => {
      const currentQuantity = prev[itemId] || 0;

      if (currentQuantity <= 1) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }

      return {
        ...prev,
        [itemId]: currentQuantity - 1,
      };
    });
  }

  const selectedItems = useMemo(() => {
    return menuItems
      .filter((item) => (quantities[item.id] || 0) > 0)
      .map((item) => ({
        ...item,
        quantity: quantities[item.id],
      }));
  }, [menuItems, quantities]);

  const totalItems = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedItems]);

  const groupedMenu = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      ...category,
      items: menuItems.filter((item) => item.category === category.key),
    })).filter((category) => category.items.length > 0);
  }, [menuItems]);

  async function handleSubmitOrder() {
    setSubmitError("");
    setSuccessInfo(null);

    if (!tableNumber || Number(tableNumber) <= 0) {
      setSubmitError("Tens de indicar um número de mesa válido.");
      return;
    }

    if (selectedItems.length === 0) {
      setSubmitError("Tens de escolher pelo menos um prato.");
      return;
    }

    const orderData = {
      table_number: Number(tableNumber),
      items: selectedItems.map((item) => ({
        menu_item_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      setIsSubmitting(true);

      const createdOrder = await createOrder(orderData);

      setSuccessInfo({
        tableNumber: Number(tableNumber),
        totalItems,
        orderId: createdOrder.id,
      });

      setQuantities({});
      setTableNumber("");
    } catch (err) {
      setSubmitError("Não foi possível submeter o pedido.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <p className="loading-message">A carregar menu...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="page">
      <div className="cliente-hero">
        <h1 className="page-title">Fazer Pedido</h1>
        <p className="page-subtitle">
          Escolhe a mesa, seleciona os pratos e submete o pedido
        </p>
      </div>

      <div className="order-form">
        <label htmlFor="tableNumber">Número da mesa</label>
        <input
          id="tableNumber"
          type="number"
          min="1"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Ex: 4"
        />
      </div>

      {groupedMenu.map((category) => (
        <section key={category.key} className="menu-section">
          <div className="menu-section-header">
            <h2 className="menu-section-title">{category.label}</h2>
          </div>

          <div className="menu-grid">
            {category.items.map((item) => {
              const quantity = quantities[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className={`menu-card ${quantity > 0 ? "menu-card-selected" : ""}`}
                >
                  <h3>{item.name}</h3>
                  <span className="menu-category">{category.label}</span>
                  <p className="menu-description">{item.description}</p>
                  <p className="menu-ingredients">
                    <strong>Ingredientes:</strong> {item.ingredients}
                  </p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className="order-summary">
        <h2>Resumo do Pedido</h2>

        {selectedItems.length === 0 ? (
          <p>Ainda não selecionaste nenhum prato.</p>
        ) : (
          <>
            {selectedItems.map((item) => (
              <div key={item.id} className="summary-line">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
              </div>
            ))}

            <p>
              <strong>Total de itens:</strong> {totalItems}
            </p>

            <div className="summary-actions">
              <button
                className="clear-button"
                onClick={() => {
                  setQuantities({});
                  setSubmitError("");
                  setSuccessInfo(null);
                }}
                disabled={isSubmitting}
              >
                Limpar seleção
              </button>

              <button
                className="submit-button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "A submeter..." : "Submeter Pedido"}
              </button>
            </div>
          </>
        )}

        {submitError && <p className="form-error-message">{submitError}</p>}

        {successInfo && (
          <div className="success-box">
            <h3>Pedido enviado com sucesso</h3>
            <p>
              O pedido <strong>#{successInfo.orderId}</strong> está a ser preparado.
            </p>
            <p>
              Total de itens submetidos: <strong>{successInfo.totalItems}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientePage;