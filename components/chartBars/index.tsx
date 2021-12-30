import React, { useRef } from "react";
import { Container, Top, BoxBars, BoxBarsChild, BoxBarLeft, BoxBarRight, RecipeBar, RecipeLabel, BoxLegend, BoxLegendChild, ExpenseLabel, ExpenseBar, Footer, LegendColor, LegendText, BoxFooterLabels, BoxFooterLabelText, FooterLeft, FooterRight } from "./styles";
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { styles, COLORS, FONTS, SIZES, icons, images, transactions } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faChevronRight, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import util from '../../util';



export default function ChartBars(props) {
    const { data = [], handleNext = () => {}, handlePrevious = () => {} } = props;

    function renderBars(data, isFooter = false) {

        function getBigger(data) {
            let valueBigger = 0;
            data.map((item, index) => {
                if (item.recept > valueBigger)
                    valueBigger = item.recept;
                if (item.expense > valueBigger)
                    valueBigger = item.expense;
            })
            return valueBigger;
        }

        function labelFontSize(data) {
            if (data && data.length == 1)
                return 23;
            else if (data && data.length == 2)
                return 18;
            else
                return 13;
        }

        function barRadius(data) {
            if (data && data.length == 1)
                return 15;
            else if (data && data.length == 2)
                return 12;
            else
                return 10;
        }

        function percentWidth(data) {
            if (data && data.length == 1)
                return 55;
            else if (data && data.length == 2)
                return 65;
            else
                return 80;
        }

        function handleNumber(number, data) {
            if (data && data.length > 1) {
                while (number.indexOf('R$') > -1)
                    number = number.replace('R$', '');
                while (number.indexOf(' ') > -1)
                    number = number.replace(' ', '');
                while (number.indexOf('-') > -1)
                    number = number.replace('-', '');
            }

            return number;
        }

        function spaceBetweenBars(data) {
            if (data && data.length == 1)
                return 10;
            else if (data && data.length == 2)
                return 5;
            else
                return 1;
        }

        function footerLabelTextFontSize(data) {
            if (data && data.length == 1)
                return 16;
            else if (data && data.length == 2)
                return 14;
            else
                return 13;
        }

        if (data && data.length) {
            return data.map((item, index) => {
                const valueBigger = getBigger(data);
                let recept = util.clearNumber(item.recept).toFixed(2);
                let expense = util.clearNumber(item.expense).toFixed(2);

                let percentRecept = recept >= valueBigger ? 100 : ((recept / valueBigger) * 100).toFixed(2);
                let percentExpense = expense >= valueBigger ? 100 : ((expense / valueBigger) * 100).toFixed(2);

                if (recept == 0)
                    percentRecept = 0.8;
                if (expense == 0)
                    percentExpense = 0.8;

                return (
                    <BoxBarsChild
                        key={index}
                        style={{
                            width: (100 / data.length) + '%',
                            backgroundColor: isFooter && item.label && item.label.length > 0 ? 'rgba(0,0,0,0.05)' : 'transparent',
                            justifyContent: 'center',
                        }}>

                        {!isFooter && (
                            <>
                                <BoxBarLeft spaceBetweenBars={spaceBetweenBars(data)}>
                                    <RecipeLabel labelFontSize={labelFontSize(data)}>{handleNumber(util.numberFormat(recept), data)}</RecipeLabel>
                                    <RecipeBar percentRecept={percentRecept} barRadius={barRadius(data)} percentWidth={percentWidth(data)} />
                                </BoxBarLeft>
                            </>
                        )}
                        {isFooter && item.label && item.label.length > 0 && <BoxFooterLabelText fontSize={footerLabelTextFontSize(data)}>{item.label}</BoxFooterLabelText>}
                        {!isFooter && (
                            <>
                                <BoxBarRight spaceBetweenBars={spaceBetweenBars(data)}>
                                    <ExpenseLabel labelFontSize={labelFontSize(data)}>{handleNumber('-' + util.numberFormat(expense), data)}</ExpenseLabel>
                                    <ExpenseBar percentExpense={percentExpense} barRadius={barRadius(data)} percentWidth={percentWidth(data)} />
                                </BoxBarRight>
                            </>
                        )}
                    </BoxBarsChild>
                )
            })
        }
    }

    function renderNavigationButton(icon, isLeft = true) {
        return (
            <TouchableOpacity
                style={{
                    width: 40,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    margin: 10,
                    borderTopLeftRadius: isLeft ? 5 : 0,
                    borderTopRightRadius: !isLeft ? 5 : 0,
                    borderBottomLeftRadius:  isLeft ? 5 : 0,
                    borderBottomRightRadius:  !isLeft ? 5 : 0,
                    backgroundColor: COLORS.white,
                    // ...styles.shadow,
                }}
                onPress={() => { isLeft ? handlePrevious() : handleNext() }}>
                <FontAwesomeIcon icon={icon} size={25} color={'#000'} style={{ opacity: 0.9, }} />
            </TouchableOpacity>
        )
    }

    function renderBalance(balance, data) {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    margin: 0,
                    marginTop: -2,
                    marginBottom: 0,
                    borderRadius: 0,
                    backgroundColor: '#c9c9c9b5',
                }}>
                <FontAwesomeIcon icon={faDollarSign} size={45} color={'#000'} style={{ opacity: 0.5, marginLeft: -10, marginRight: -10, }} />
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center', color: '#243027' }}>{balance}</Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', alignSelf: 'center', color: '#919090', }}>SALDO DO {data && data.length == 1 ? 'MÊS' : 'PERÍODO'}</Text>
                </View>
            </View>
        )
    }


    return (
        <Container>
            <Top>
                <BoxLegend>
                    <BoxLegendChild>
                        <LegendColor legendColor={'blue'} />
                        <LegendText>Receitas</LegendText>
                    </BoxLegendChild>
                    <BoxLegendChild>
                        <LegendColor legendColor={'red'} />
                        <LegendText>Despesas</LegendText>
                    </BoxLegendChild>
                </BoxLegend>
            </Top>
            <BoxBars>
                {renderBars(data)}
            </BoxBars>
            <Footer>
                <BoxFooterLabels>
                    {renderBars(data, true)}
                </BoxFooterLabels>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    {renderNavigationButton(faChevronLeft)}
                    {renderBalance(util.numberFormat(transactions.totalReceipt() - transactions.totalExpenditure()), data)}
                    {renderNavigationButton(faChevronRight, false)}
                </View>
                {/* <View 
                style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                }}>
                    {renderNavigationButton(faChevronLeft)}
                    {renderNavigationButton(faChevronRight)}
                </View> */}
                {/* <FooterLeft>

                </FooterLeft>
                <FooterRight>

                </FooterRight> */}
            </Footer>
        </Container>
    )
}