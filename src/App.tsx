import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import styles from "./App.module.scss";
import { useStoreStore } from "./store";
import Products from "./pages/Products";
import Header from "./pages/Header";

function App() {
    const { darkAlgorithm } = theme;
    const fetchInitialItems = useStoreStore((state) => state.fetchInitialItems);

    useEffect(() => {
        fetchInitialItems();
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: darkAlgorithm,
                token: {
                    colorBgBase: "#121212",
                    colorTextBase: "rgba(255, 255, 255, 0.85)",
                },
                components: {
                    Input: {
                        activeBorderColor: "#66F0FF"
                    }
                }
            }}
        >
            <div className={styles.app}>
                <Header />
                <main className={styles.mainContent}>
                    <div className={styles.storeTitle}>
                        <h1>Share your ideas.</h1>
                        <h1>Empower your design.</h1>
                    </div>

                    <Products />
                </main>
            </div>
        </ConfigProvider>
    );
}

export default App;
