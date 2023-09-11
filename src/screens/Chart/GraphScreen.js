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
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
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
                backgroundColor: '#171212',
                margin: 10,
                borderRadius: 10,
                width: 200
            }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Total Sales: {totalSales}</Text>
            </View>

        </View>
    );
};

export default GraphScreen;
