import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './index.css';
export default function Charts() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const svgRef = useRef(null);
  const svgRefAdmin = useRef();
  const svgRefNormal = useRef();

  const apiUrl = 'http://127.0.0.1:5000'; //process.env.API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/analytics/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (!data) return;

    const maxAdmin = Math.max(data.data.admin.active, data.data.admin.inactive);
    const maxNormal = Math.max(data.data.normal.active, data.data.normal.inactive);
    const maxY = Math.max(maxAdmin, maxNormal);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(['Active', 'Inactive']);

    const y = d3.scaleLinear().range([height, 0]).domain([0, maxY]);

    const svgAdmin = d3.select(svgRefAdmin.current);
    svgAdmin.selectAll('*').remove(); 

    const gAdmin = svgAdmin
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    gAdmin
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    gAdmin
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')));

    gAdmin
      .selectAll('.bar')
      .data(['active', 'inactive'])
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d))
      .attr('y', d => y(data.data.admin[d]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(data.data.admin[d]))
      .style('fill', d => (d === 'active' ? 'steelblue' : 'orange'));

    // usuarios q sao normais
    const svgNormal = d3.select(svgRefNormal.current);
    svgNormal.selectAll('*').remove(); 

    const gNormal = svgNormal
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    gNormal
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    gNormal
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')));

    gNormal
      .selectAll('.bar')
      .data(['active', 'inactive'])
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d))
      .attr('y', d => y(data.data.normal[d]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(data.data.normal[d]))
      .style('fill', d => (d === 'active' ? 'steelblue' : 'orange'));
  }, [data]);
  return (
    <>
    <div className='graficos'>
     <h1> Gráfico - Admin</h1>
    <svg ref={svgRefAdmin} className='admin'/>
    <h1> Gráfico - Usuário padrão </h1>
    <svg ref={svgRefNormal} className='normal'/>
    </div>
   </>
  );
}
 