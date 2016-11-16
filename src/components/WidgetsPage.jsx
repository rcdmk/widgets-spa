/**
 * Widgets page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import CreateEditWidget from './CreateEditWidget';
import WidgetActions from '../actions/WidgetActions';
import WidgetStore from '../stores/WidgetStore';

export default class WidgetsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = WidgetStore.getState();
        
        WidgetActions.loadWidgets();

        this.state.widgets = [];
        this.state.create = false;
        this.state.edit = false;

        // needed for binding context
        this.showCreateForm = this.showCreateForm.bind(this);
        this.onSaveForm = this.onSaveForm.bind(this);
        this.onCloseForm = this.onCloseForm.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    showCreateForm(e) {
        const newState = {
            create: !this.state.create,
            edit: false
        };

        this.setState(newState);
    }

    showEditForm(e, widget) {
        const newState = {
            create: false,
            edit: true,
            widgetToEdit: widget
        };

        this.setState(newState);
    }

    onSaveForm(widget) {
        const newState = {
            widgets: this.state.widgets
        };

        if (this.state.create) {
            widget.id = widget.id || newState.widgets.length + 1;
            newState.widgets.push(widget);
        }

        this.setState(newState);
    }

    onCloseForm(e) {
        this.setState({ create: false, edit: false, widgetToEdit: undefined });
    }

    _onChange() {
        this.setState(WidgetStore.getState());
    }

    componentWillMount() {
        WidgetStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        WidgetStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div className="page-content">
                <HeaderBar title="Widgets" breadcrumb="Home / Widgets" />

                <div className="row">
                    <div className="col-lg-12">
                        <div className="widget">
                            <div className="widget-header">Widgets
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-info" onClick={this.showCreateForm}>+ Create</button>
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
                                            this.state.widgets ?
                                                this.state.widgets.map((widget, i) => (
                                                        <tr key={widget.id} onDoubleClick={(e) => this.showEditForm(e, widget)}>
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
                {
                    // if
                    (this.state.create || this.state.edit) && <CreateEditWidget widget={this.state.widgetToEdit} create={this.state.create} edit={this.state.edit} onSaveForm={this.onSaveForm} onCloseForm={this.onCloseForm} />
                }
           </div>
        );
    }
}
