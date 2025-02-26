import { render, screen, waitFor } from "@testing-library/react";
import { AppProvider, AppContext } from "./src/Context";
import axios from "axios";

jest.mock("axios");

describe("AppProvider WebSocket & API Tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("fetches orders.json and updates state", async () => {
    const mockOrders = [
      { id: "ORDER053", status: "Delivered", /* ... */ },
      { id: "ORDER054", status: "In Transit", /* ... */ },
    ];

    axios.get.mockResolvedValue({ data: mockOrders });

    render(
      <AppProvider>
        <AppContext.Consumer>
          {(context) => (
            <span data-testid="order-count">{context.orders.length}</span>
          )}
        </AppContext.Consumer>
      </AppProvider>
    );

    await waitFor(() => expect(screen.getByTestId("order-count")).toHaveTextContent("2"));
  });

  test("WebSocket receives new order and updates state", async () => {
    const mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: 1,
      onopen: jest.fn(),
      onmessage: jest.fn(),
      onclose: jest.fn(),
      onerror: jest.fn(),
    };

    global.WebSocket = jest.fn(() => mockWebSocket);

    const initialOrders = [{ id: 1, status: "New", distance: 100 }]; // Set initial context data
    axios.get.mockResolvedValue({ data: initialOrders });

    render(
      <AppProvider>
        <AppContext.Consumer>
          {(context) => (
            <span data-testid="order-size">{context.orders.length}</span>
          )}
        </AppContext.Consumer>
      </AppProvider>
    );

    await waitFor(() => {
      mockWebSocket.onmessage({ data: JSON.stringify({ type: "new_order", order: { id: 3, status: "Loading", distance: 150 } }) });
    });

    await waitFor(() => expect(screen.getByTestId("order-size")).toHaveTextContent("2"));
  });

  test("WebSocket updates an existing order", async () => {
    const initialOrders = [{ id: 1, status: "New", distance: 100 }];
    axios.get.mockResolvedValue({ data: initialOrders });

    const mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: 1,
      onopen: jest.fn(),
      onmessage: jest.fn(),
      onclose: jest.fn(),
      onerror: jest.fn(),
    };

    global.WebSocket = jest.fn(() => mockWebSocket);

    render(
      <AppProvider>
        <AppContext.Consumer>
          {(context) => (
            <span data-testid="order-status">{context.orders[0]?.status || ""}</span>
          )}
        </AppContext.Consumer>
      </AppProvider>
    );

    await waitFor(() => {
      mockWebSocket.onmessage({ data: JSON.stringify({ type: "update_order", order: { id: 1, status: "Delivered", distance: 100 } }) });
    });

    await waitFor(() => expect(screen.getByTestId("order-status")).toHaveTextContent("Delivered"));
  });

  test("WebSocket reconnects when disconnected", async () => {
    const mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: 1,
      onopen: jest.fn(),
      onmessage: jest.fn(),
      onclose: jest.fn(),
      onerror: jest.fn(),
    };

    global.WebSocket = jest.fn(() => mockWebSocket);

    render(<AppProvider>{null}</AppProvider>);

    expect(global.WebSocket).toHaveBeenCalledTimes(1);

    mockWebSocket.onclose();

    await waitFor(() => expect(global.WebSocket).toHaveBeenCalledTimes(2));

    // Optional: Add a check to verify that the second call happened after onclose
  });
});