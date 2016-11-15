/**
 * Widgets page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import CreateEditWidget from './CreateEditWidget';

export default class WidgetsPage extends React.Component {
    constructor(props) {
        super(props);

        var p = props || this.props;

        this.state = this.state || {};
        this.state.create = p.create || false;
        this.state.edit = p.edit || false;
    }

    render() {
        return (
            <div className="page-content">
                <HeaderBar title={this.props.title} breadcrumb="Home / Widgets" />

                <div className="row">
                    <div className="col-lg-12">
                        <div className="widget">
                            <div className="widget-header">Widgets
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-info">+ Create</button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">ID</th>
                                            <th>Name</th>
                                            <th>Color</th>
                                            <th>Price</th>
                                            <th>Melts?</th>
                                            <th>Inventory</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            // if
                                            this.props.widgets ?
                                                this.props.widgets.map((widget, i) => (
                                                        <tr key={widget.id}>
                                                            <td className="text-center">{widget.id}</td>
                                                            <td>{widget.name}</td>
                                                            <td>{widget.color}</td>
                                                            <td>${widget.price}</td>
                                                            <td>{widget.melts ? 'yes' : 'no'}</td>
                                                            <td>{widget.inventory}</td>
                                                        </tr>
                                                    )
                                                )
                                            // else
                                            :
                                                (
                                                    <tr>
                                                        <td colSpan="6">No records found!</td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {
                    // if
                    (this.state.create || this.state.edit) && (
                            <div className="row">
                                <div className="col-lg-12">
                                    <CreateEditWidget widget={this.state.widgetToEdit} />
                                </div>
                            </div>
                        )
                    }
           </div>
        );
    }
}
