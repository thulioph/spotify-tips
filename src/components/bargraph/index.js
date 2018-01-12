import React from 'react';
import * as d3 from 'd3';

// ====

class BarGraph extends React.Component {
    constructor(props) {
        super(props);

        this.createCharPie = this.createCharPie.bind(this);
    }

    createCharPie(data) {
        if (Object.keys(data) <= 0) {
            return;
        }

        console.warn(data);

        let margin = { top: 20, right: 20, bottom: 30, left: 40 };
        let width = 960 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;

        let x = d3.scaleBand().range([0, width]).padding(0.1);
        let y = d3.scaleLinear().range([height, 0]);

        let svg = d3.select(this.svg).append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    }

    componentDidMount() {
        const { data } = this.props;
        this.createCharPie(data);
    }

    componentDidUpdate() {
        const { data } = this.props;
        this.createCharPie(data);
    }

    render() {
        return (
            <aside id="bar-wrapper">
                <svg
                    ref={node => this.svg = node}
                    width={800}
                    height={400}>
                </svg>
            </aside>
        );
    }
}

// ====

export default BarGraph;