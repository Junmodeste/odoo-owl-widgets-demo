/**
 * Widget de champ « status_badge » : affiche un champ selection sous forme de
 * badge coloré. Widget d'affichage uniquement (il ne modifie pas la valeur).
 *
 * Usage : <field name="state" widget="status_badge"/>
 * Couleurs personnalisables : options="{'colors': {'done': 'success'}}"
 */
import { Component } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

// Couleur Bootstrap par défaut pour chaque valeur ; "secondary" sinon.
const DEFAULT_COLORS = {
    draft: "secondary",
    in_progress: "info",
    done: "success",
    blocked: "danger",
};

export class StatusBadgeField extends Component {
    static template = "odoo_owl_counter_widget.StatusBadgeField";
    static props = {
        ...standardFieldProps,
        colors: { type: Object, optional: true },
    };
    static defaultProps = { colors: {} };

    get value() {
        return this.props.record.data[this.props.name];
    }

    /** Libellé traduit de la valeur, pris dans la définition du champ. */
    get label() {
        const selection = this.props.record.fields[this.props.name].selection;
        const option = selection.find(([value]) => value === this.value);
        return option ? option[1] : "";
    }

    get color() {
        return this.props.colors[this.value] || DEFAULT_COLORS[this.value] || "secondary";
    }
}

export const statusBadgeField = {
    component: StatusBadgeField,
    displayName: _t("Status Badge"),
    supportedTypes: ["selection"],
    extractProps: ({ options }) => ({
        colors: options.colors,
    }),
};

registry.category("fields").add("status_badge", statusBadgeField);
