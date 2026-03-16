const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchMenu() {
  const response = await fetch(`${API_BASE_URL}/menu/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar o menu.");
  }

  return response.json();
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar o pedido.");
  }

  return response.json();
}

export async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/orders/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar os pedidos.");
  }

  return response.json();
}

export async function updateOrderStatus(orderId, status) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar o estado do pedido.");
  }

  return response.json();
}