import { useEffect, useMemo, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../services/api";
import "./CozinhaPage.css";

const STATUS_COLUMNS = [
  { key: "order_preview", title: "Order Preview" },
  { key: "preparing", title: "Preparing" },
  { key: "cooling_down", title: "Cooling Down" },
  { key: "ready_to_serve", title: "Ready to Serve" },
  { key: "concluded", title: "Concluded" },
];

function CozinhaPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError("Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      setUpdatingOrderId(orderId);
      const updatedOrder = await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? updatedOrder : order))
      );
    } catch (err) {
      setError("Não foi possível atualizar o estado do pedido.");
    } finally {
      setUpdatingOrderId(null);
    }
  }

  function getNextStatus(currentStatus) {
    const currentIndex = STATUS_COLUMNS.findIndex(
      (column) => column.key === currentStatus
    );

    if (currentIndex === -1 || currentIndex === STATUS_COLUMNS.length - 1) {
      return null;
    }

    return STATUS_COLUMNS[currentIndex + 1].key;
  }

  function getPreviousStatus(currentStatus) {
    const currentIndex = STATUS_COLUMNS.findIndex(
      (column) => column.key === currentStatus
    );

    if (currentIndex <= 0) {
      return null;
    }

    return STATUS_COLUMNS[currentIndex - 1].key;
  }

  function getStatusLabel(statusKey) {
    const status = STATUS_COLUMNS.find((column) => column.key === statusKey);
    return status ? status.title : statusKey;
  }

  const groupedOrders = useMemo(() => {
    return STATUS_COLUMNS.reduce((acc, column) => {
      acc[column.key] = orders.filter((order) => order.status === column.key);
      return acc;
    }, {});
  }, [orders]);

  if (loading) {
    return <p className="loading-message">A carregar pedidos...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="kitchen-page">
      <div className="kitchen-header">
        <div>
          <h1 className="kitchen-title">Dashboard da Cozinha</h1>
          <p className="kitchen-subtitle">Acompanhar e atualizar pedidos</p>
        </div>

        <button className="refresh-button" onClick={loadOrders}>
          Refresh
        </button>
      </div>

      <div className="kitchen-board">
        {STATUS_COLUMNS.map((column) => (
          <div key={column.key} className="kitchen-column">
            <h2>{column.title}</h2>

            <div className="column-orders">
              {groupedOrders[column.key]?.length === 0 ? (
                <p className="empty-column">Sem pedidos</p>
              ) : (
                groupedOrders[column.key].map((order) => {
                  const nextStatus = getNextStatus(order.status);
                  const previousStatus = getPreviousStatus(order.status);

                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <p><strong>Pedido #{order.id}</strong></p>
                        <span className="status-badge">
                          {getStatusLabel(order.status)}
                        </span>
                      </div>

                      <p><strong>Mesa:</strong> {order.table_number}</p>
                      <p>
                        <strong>Criado em:</strong>{" "}
                        {new Date(order.created_at).toLocaleString()}
                      </p>

                      <div className="order-lines">
                        {order.lines.map((line) => (
                          <div key={line.id} className="order-line">
                            <p>
                              {line.menu_item.name} x{line.quantity}
                            </p>
                            <p className="ingredients-text">
                              Ingredientes: {line.menu_item.ingredients}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="order-actions">
                        <button
                          className="secondary-action-button"
                          onClick={() =>
                            previousStatus &&
                            handleStatusChange(order.id, previousStatus)
                          }
                          disabled={
                            !previousStatus || updatingOrderId === order.id
                          }
                        >
                          Voltar
                        </button>

                        <button
                          className="primary-action-button"
                          onClick={() =>
                            nextStatus && handleStatusChange(order.id, nextStatus)
                          }
                          disabled={!nextStatus || updatingOrderId === order.id}
                        >
                          {updatingOrderId === order.id
                            ? "A atualizar..."
                            : nextStatus
                            ? `Avançar para ${getStatusLabel(nextStatus)}`
                            : "Estado final"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CozinhaPage;