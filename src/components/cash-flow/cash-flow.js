/* eslint-disable no-loop-func */
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, } from 'recharts';
import api from "../../api";

let transactions = [];
let categories = [];
let currentCategory = [];
let COLORS = [];
let data = [];

//Create an array with all transactions (or requested transactions)
async function getAllExistingTransactions() {
    
  await getEveryTransaction()
    .then((value) => {
      const t = value.data.data;
      if (t.length > 0) {transactions = t}
      sortTransactions(transactions);
    })
    .catch(err => {
      console.error("Connection error", err.message)
    });
  }

function getEveryTransaction() {
  return api.getEveryTransaction();
}

getAllExistingTransactions();

const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

function sortTransactions(trans) {
  var i = 0;
  do {
    if (categories.length === 0) {
      categories.push({
        name: trans[i].category, 
        value: trans[i].amount})
      } else {
          currentCategory = categories.filter(c => c.name === trans[i].category);
          if (currentCategory.length === 0) {
            categories.push({
              name: trans[i].category, 
              value: parseFloat(trans[i].amount)})
          } else {
              currentCategory[0].value = parseFloat(currentCategory[0].value) + 
                parseFloat(trans[i].amount);
          }
        }
      i++;
    }
  while (i < trans.length);
  categories.forEach(c => {
    if (c.name !== "Income") {
      c.value = Math.abs(c.value)
      const newColor = random_hex_color_code();
      COLORS.push(newColor);
      categories.color = newColor;
    }
  });
  const data3 = categories.filter(cat => cat.name !== "Income");
  const data2 = data3.filter(cat => cat.value !== 0);
  data = data2.filter(cat => (cat.name) );
}



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
  
  
  render() {
    return (
        <div className="container transaction-container">
            <div className="row">
                <h2>Cash Flow Report</h2>
            </div>
            <div className="row">
                <div className="col-lg-6 cash-flow">
                    <div className="row">
                      <p><h3>Category Summary</h3></p>
                    </div>
                    {data.map((cat, index) => {
                      const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(cat.value));
                      const fColor = {color: COLORS[index], fontSize: "1rem", fontWeight: "bold"}
                      return (
                      <div className="row">
                        <div className="col-lg-4">
                          <p style={fColor}>{cat.name}</p>
                        </div>
                        <div className="col-lg-2 right-align">
                          <p style={fColor}>{amount}</p>
                        </div>
                      </div>
                    )} 
                    )}
                </div>
                <div className="col-lg-6">
                    <PieChart width={400} height={400}>
                        <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={180}
                        fill="#8884d8"
                        dataKey="value"
                        >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                    </PieChart>
                </div>
            </div>
      </div>
    );
  }
}
