/**
 * Create/Edit widget form definition
 */
import React from 'react';
import $ from 'jquery';

export default class CreateEditWidget extends React.Component {
    constructor(props) {
        super(props);

        const p = props || this.props || {};

        // initial state
        this.state = this.state || {};
        this.state.originalWidgetValues = p.widget || {};
        this.state.widget = $.extend({}, this.state.originalWidgetValues); // copy properties to lose refs
        this.state.error = '';

        // needed to bind context
        this.loadWidgetValuesFromInputs = this.loadWidgetValuesFromInputs.bind(this);
        this.validateWidget = this.validateWidget.bind(this);
        this.saveWidget = this.saveWidget.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    loadWidgetValuesFromInputs() {
        const widget = this.state.widget;

        widget.name = this.refs['widget-name'].value;        
        widget.price = this.refs['widget-price'].value;        
        widget.color = this.refs['widget-color'].value;        
        widget.melts = this.refs['widget-properties-0'].checked;        
        widget.inventory = this.refs['widget-count'].value;        

        this.setState({widget: widget});

        return widget;
    }

    validateWidget(widget) {
        let error = '';

        if (!widget.name) {
            error = 'Name is required!';            
        } else if(!widget.price) {
            error = 'Price is required!';
        } else if (isNaN(parseFloat(widget.price))) {
            error = 'Price must be a number!';
        } else if(!widget.color) {
            error = 'Color is required!';
        } else if (!widget.inventory) {
            error = 'Inventory is required!';
        } else if (isNaN(parseFloat(widget.inventory))) {
            error = 'Inventory must be a number!';
        } else if (parseFloat(widget.inventory) !== parseInt(widget.inventory, 10)) {
            error = 'Inventory must be a whole number!';
        }

        this.setState({ error: error });

        return !error;
    }

    saveWidget(e) {
        e.preventDefault();
        
        this.loadWidgetValuesFromInputs();
        const widget = $.extend(this.state.originalWidgetValues, this.state.widget);

        if (this.validateWidget(widget)) {
            this.props.onSaveForm(widget);
            this.closeForm(e);
        }
    }

    closeForm(e) {
        e.preventDefault();
        this.props.onCloseForm(e);
    }

    render() {
        const widget = this.state.widget;

        return (
            <div className="modal show affix">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="widget">
                                <div className="widget-header">Create/Edit Widget</div>
                                <div className="widget-body">
                                    <form className="form-horizontal">
                                        <legend>{ this.props.create ? 'Create' : 'Edit'} Widget</legend>

                                        {
                                            // if
                                            this.state.error && (
                                                <div className="alert alert-danger"><i className="fa fa-exclamation-circle"></i> {this.state.error}</div>
                                            )
                                        }

                                        <div className="controls">
                                            Name
                                            <input id="widget-name" name="widget-name" ref="widget-name" type="text" placeholder="foo-bar" className="input-medium" value={widget.name} onChange={this.loadWidgetValuesFromInputs} />
                                        </div>

                                        <div className="controls">
                                            <div className="input-prepend">
                                            Price
                                                <span className="add-on">$</span>
                                                <input id="widget-price" name="widget-price" ref="widget-price" className="input-medium" placeholder="0.00" type="text" value={widget.price} onChange={this.loadWidgetValuesFromInputs} />
                                            </div>
                                        </div>

                                        <div className="controls">
                                            Color
                                            <select id="widget-color" name="widget-color" ref="widget-color" className="input-large" value={widget.color} onChange={this.loadWidgetValuesFromInputs}>
                                                <option>red</option>
                                                <option>purple</option>
                                                <option>black</option>
                                                <option>green</option>
                                                <option>magenta</option>
                                                <option>white</option>
                                                <option>depends on the viewing angle</option>
                                            </select>
                                        </div>

                                        <div className="controls">
                                            Melts
                                            <input type="checkbox" name="widget-properties" id="widget-properties-0" ref="widget-properties-0" value="melts" checked={widget.melts} onChange={this.loadWidgetValuesFromInputs} />
                                        </div>

                                        <div className="controls">
                                            Inventory
                                            <input id="widget-count" name="widget-count" ref="widget-count" type="text" placeholder="#?" className="input-small" value={widget.inventory} onChange={this.loadWidgetValuesFromInputs} />
                                        </div>
                                        <hr />
                                        <div className="controls">
                                            <button className="btn btn-sm btn-info" onClick={this.saveWidget}>Save</button>
                                            <button className="btn btn-sm btn-default" onClick={this.closeForm}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
