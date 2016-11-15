/**
 * Filterable table widget definition
 */
import React from 'react';

export default class FilterableTable extends React.Component {
    constructor(props) {
        super(props);

        const p = props || this.props || {};

        // initial state
        this.state = this.state || {};
        this.state.list = p.list || [];

        // needed to bind the current context
        this.filterRecords = this.filterRecords.bind(this);
    }

    filterRecords() {
        const searchString = this.refs.filterInput.value;
        const filteredList = this.props.list.filter((item, i) => item.name.toLowerCase().indexOf(searchString) >= 0);

        this.setState({ list: filteredList });
    }

    renderImageHeader() {
        if (this.props && this.props.showImage) {
            return <th>Avatar</th>;
        }
    }

    renderImageCel(url) {
        if (this.props && this.props.showImage) {
            return <td><img src={url} /></td>;
        }
    }

    render() {
        return (
            <div className="widget">
                <div className="widget-header">{this.props.title}
                    <div className="pull-right"><input type="text" className="form-control input-sm" ref="filterInput" onChange={this.filterRecords} /></div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th>Name</th>
                                {this.renderImageHeader()}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // if
                                this.state.list.length ?
                                    this.state.list.map((item, i) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{item.id}</td>
                                                <td>{item.name}</td>
                                                {this.renderImageCel(item.gravatar)}
                                            </tr>
                                        )
                                    )
                                : // else
                                    <tr>
                                        <td colSpan={this.props && this.props.showImage ? 3 : 2 }>No records found!</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
