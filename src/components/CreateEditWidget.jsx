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
        this.state.widget = {};
        this.state.widget = $.extend({}, this.state.originalWidgetValues); // copy properties to lose refs

        // needed to bind context
        this.handleChangeInputs = this.handleChangeInputs.bind(this);
        this.saveWidget = this.saveWidget.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    mapInputNamesToProperties(inputName) {
        const name = inputName.split('-')[1];

        const map = {
            'properties': 'melts',
            'count': 'inventory'
        };

        return map[name] || name;
    }

    handleChangeInputs(e) {
        const input = e.target;
        const widget = this.state.widget;
        const propName = this.mapInputNamesToProperties(input.name);

        if (input.type === 'checkbox') {
            widget[propName] = input.checked;
        } else {
            widget[propName] = input.value;
        }

        this.setState({widget: widget});
    }

    saveWidget(e) {
        e.preventDefault();
        
        const widget = $.extend(this.state.originalWidgetValues, this.state.widget);

        this.props.onSaveForm(widget);
        this.closeForm(e);
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

                                        <div className="controls">
                                            Name
                                            <input id="widget-name" name="widget-name" type="text" placeholder="foo-bar" className="input-medium" value={widget.name} onChange={this.handleChangeInputs} />
                                        </div>

                                        <div className="controls">
                                            <div className="input-prepend">
                                            Price
                                                <span className="add-on">$</span>
                                                <input id="widget-price" name="widget-price" className="input-medium" placeholder="0.00" type="text" value={widget.price} onChange={this.handleChangeInputs} />
                                            </div>
                                        </div>

                                        <div className="controls">
                                            Color
                                            <select id="widget-color" name="widget-color" className="input-large" value={widget.color} onChange={this.handleChangeInputs}>
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
                                            <input type="checkbox" name="widget-properties" id="widget-properties-0" value="melts" checked={widget.melts} onChange={this.handleChangeInputs} />
                                        </div>

                                        <div className="controls">
                                            Inventory
                                            <input id="widget-count" name="widget-count" type="text" placeholder="#?" className="input-small" value={widget.inventory} onChange={this.handleChangeInputs} />
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
