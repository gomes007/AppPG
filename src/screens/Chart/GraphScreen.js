import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import socket from "./socket";

const GraphScreen = () => {
    const [data, setData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        // Conectar ao socket
        socket.connect();

        socket.emit('requestInitialData');

        // Ouvir novos dados
        socket.on('newData', (newData) => {
            console.log('Recebeu novos dados:', newData);
            if (newData && Array.isArray(newData)) {
                setData(newData);

                const total = newData.reduce((acc, item) => acc + item.total, 0);
                setTotalSales(total);

            } else {
                console.warn('Dados recebidos não são um array ou são nulos.');
            }
        });

        // Limpeza
        return () => {
            socket.disconnect();
            socket.off('newData');
        };
    }, []);



    const chartData = {
        labels: data ? data.map((item) => item?.nome_produto) : [],
        datasets: [
            {
                data: data ? data.map((item) => item?.total) : [],
            },
        ],
    };

    return (

        <View>

            {data && data.length > 0 ? (
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#171212",
                        backgroundGradientFrom: "#171212",
                        backgroundGradientTo: "#171212",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            ) : (
                <Text>Nenhum dado disponível para exibir.</Text>
            )}

            <View style={{
                padding: 20,
                backgroundColor: '#9c9d9d',
                margin: 10,
                borderRadius: 10,
                width: 200
            }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Total Sales: {totalSales}</Text>
            </View>

        </View>
    );
};

export default GraphScreen;
