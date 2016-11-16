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
        this.state.searchString = "";

        // needed to bind the current context
        this.filterRecords = this.filterRecords.bind(this);
    }

    static get propTypes() {
        return {
            onSearch: React.PropTypes.func.isRequired,
            list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
        };
    }

    filterRecords() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        const searchString = this.refs.filterInput.value;
        this.setState({ searchString: searchString });

        // avoid pooling the server too much
        this.interval = setTimeout(() => this.props.onSearch(searchString), 200);
    }

    renderImageHeader() {
        if (this.props.showImage) {
            return <th>Avatar</th>;
        }
    }

    renderImageCel(url) {
        if (this.props.showImage) {
            return <td><img src={url} /></td>;
        }
    }

    render() {
        return (
            <div className="widget">
                <div className="widget-header">{this.props.title}
                    <div className="pull-right">
                        <input type="text" className="form-control input-sm" ref="filterInput" value={this.state.searchString} onChange={this.filterRecords} />
                    </div>
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
                                this.props.list.length ?
                                    this.props.list.map((item, i) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{item.id}</td>
                                                <td>{item.name}</td>
                                                {this.renderImageCel(item.gravatar)}
                                            </tr>
                                        )
                                    )
                                : // else
                                    <tr>
                                        <td colSpan={this.props.showImage ? 3 : 2 }>No records found!</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
