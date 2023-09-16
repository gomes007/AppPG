import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
//import {BarChart, PieChart} from 'react-native-chart-kit';
import {BarChart} from 'react-native-gifted-charts';
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


/*
    const chartData = {
        labels: data ? data.map((item) => item?.mes_venda) : [],
        datasets: [
            {
                data: data ? data.map((item) => item?.total) : [],
            },
        ],
    };

 */


    const barData = data ? data.map((item) => ({
        value: item?.total,
        label: item?.mes_venda,
        frontColor: '#177AD5'
    })) : [];


    const screenWidth = Dimensions.get('window').width;

    const calculatedBarWidth = (screenWidth - 160) / (barData.length || 1);




    return (
        <View style={{ flex: 1, backgroundColor: '#9c9d9d', alignItems: 'center' }}>
            {barData.length > 0 ? (
                <View style={{
                    marginTop: 20,
                    backgroundColor: '#2E2E33',
                    borderRadius: 20,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    width: screenWidth - 20
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#C0C0C0', marginTop: 20 }}>Vendas Mensais</Text>

                    <BarChart
                        barWidth={calculatedBarWidth}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor="#2E86AB"
                        data={barData}
                        yAxisThickness={0}
                        xAxisThickness={0}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 12, color: '#C0C0C0', marginTop: 20 }}>Mês</Text>
                </View>
            ) : (
                <Text style={{ marginTop: 20, fontSize: 18, color: 'grey' }}>Nenhum dado disponível para exibir.</Text>
            )}

            <View style={{
                marginTop: 20,
                padding: 15,
                backgroundColor: '#2E86AB',
                borderRadius: 50,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                width: 200,
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}>Total Sales: {totalSales}</Text>
            </View>
        </View>
    );
};

export default GraphScreen;
