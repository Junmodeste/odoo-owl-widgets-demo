/**
 * Widget de champ « counter » : affiche un entier avec des boutons − et +.
 *
 * Un widget de champ Odoo 18 = un composant OWL + un objet de description
 * enregistré dans le registre `fields`. Le nom d'enregistrement ("counter")
 * est celui utilisé dans les vues : <field name="quantity" widget="counter"/>.
 */
import { Component } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class CounterField extends Component {
    // Template XML (voir counter_field.xml), chargé via les assets du manifeste.
    static template = "odoo_owl_counter_widget.CounterField";

    // standardFieldProps fournit : record, name, readonly, id.
    static props = {
        ...standardFieldProps,
        step: { type: Number, optional: true },
    };
    static defaultProps = { step: 1 };

    /** Valeur courante, lue sur l'enregistrement (0 si vide). */
    get value() {
        return this.props.record.data[this.props.name] || 0;
    }

    /** Modifie la valeur : record.update() marque l'enregistrement comme modifié. */
    add(delta) {
        this.props.record.update({ [this.props.name]: this.value + delta });
    }
}

// Description du widget : composant, types acceptés, et conversion des
// attributs XML (options="{'step': 5}") en props du composant.
export const counterField = {
    component: CounterField,
    displayName: _t("Counter"),
    supportedTypes: ["integer"],
    extractProps: ({ options }) => ({
        step: options.step,
    }),
};

registry.category("fields").add("counter", counterField);
