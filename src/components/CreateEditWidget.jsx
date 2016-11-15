/**
 * Create/Edit widget form definition
 */
import React from 'react';

export default class CreateEditWidget extends React.Component {
    constructor(props) {
        super(props);

        var p = props || this.props || {};

        // initial state
        this.state = this.state || {};
        this.state.widget = p.widget || {};
    }

    render() {
        return (
            <div className="widget">
                <div className="widget-header">Create/Edit Widget</div>
                <div className="widget-body">
                    <form className="form-horizontal">
                        <legend>{ this.props.create ? 'Create' : 'Edit'} Widget</legend>

                        <div className="controls">
                            Name
                            <input id="widget-name" name="widget-name" type="text" placeholder="foo-bar" className="input-medium" value={widget.name} />
                        </div>

                        <div className="controls">
                            <div className="input-prepend">
                            Price
                                <span className="add-on">$</span>
                                <input id="widget-price" name="widget-price" className="input-medium" placeholder="0.00" type="text" value={widget.price} />
                            </div>
                        </div>

                        <div className="controls">
                            Color
                            <select id="widget-color" name="widget-color" className="input-large" value={widget.color}>
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
                            <input type="checkbox" name="widget-properties" id="widget-properties-0" value="melts" checked={widget.melts} />
                        </div>

                        <div className="controls">
                            Inventory
                            <input id="widget-count" name="widget-count" type="text" placeholder="#?" className="input-small" value={widget.inventory} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
