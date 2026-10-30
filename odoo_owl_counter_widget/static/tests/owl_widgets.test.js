/**
 * Tests JS (hoot, le framework de tests unitaires d'Odoo 19).
 * Lancement : /web/tests?filter=odoo_owl_counter_widget (connecté en admin, mode debug).
 *
 * mountView monte une vraie vue avec un serveur simulé : aucun accès à la base.
 */
import { expect, test } from "@odoo/hoot";
import { click } from "@odoo/hoot-dom";
import { animationFrame } from "@odoo/hoot-mock";
import { defineModels, fields, models, mountView } from "@web/../tests/web_test_helpers";

// Modèle simulé, déclaré uniquement pour les tests.
class Task extends models.Model {
    _name = "owl.demo.task";

    quantity = fields.Integer();
    state = fields.Selection({
        selection: [
            ["draft", "Draft"],
            ["done", "Done"],
            ["blocked", "Blocked"],
        ],
    });

    _records = [{ id: 1, quantity: 3, state: "done" }];
}

defineModels([Task]);

test("counter: + and − buttons update the value", async () => {
    await mountView({
        resModel: "owl.demo.task",
        resId: 1,
        type: "form",
        arch: `<form><field name="quantity" widget="counter"/></form>`,
    });
    expect(".o_counter_value").toHaveText("3");

    await click(".o_counter_plus");
    await animationFrame();
    expect(".o_counter_value").toHaveText("4");

    await click(".o_counter_minus");
    await click(".o_counter_minus");
    await animationFrame();
    expect(".o_counter_value").toHaveText("2");
});

test("counter: step option", async () => {
    await mountView({
        resModel: "owl.demo.task",
        resId: 1,
        type: "form",
        arch: `<form><field name="quantity" widget="counter" options="{'step': 5}"/></form>`,
    });
    await click(".o_counter_plus");
    await animationFrame();
    expect(".o_counter_value").toHaveText("8");
});

test("counter: no buttons in readonly mode", async () => {
    await mountView({
        resModel: "owl.demo.task",
        resId: 1,
        type: "form",
        arch: `<form><field name="quantity" widget="counter" readonly="1"/></form>`,
    });
    expect(".o_counter_value").toHaveText("3");
    expect(".o_counter_field button").toHaveCount(0);
});

test("status_badge: label and color depend on the value", async () => {
    await mountView({
        resModel: "owl.demo.task",
        resId: 1,
        type: "form",
        arch: `<form><field name="state" widget="status_badge"/></form>`,
    });
    expect(".o_status_badge").toHaveText("Done");
    expect(".o_status_badge").toHaveClass("text-bg-success");
});

test("status_badge: colors option overrides the default", async () => {
    await mountView({
        resModel: "owl.demo.task",
        resId: 1,
        type: "form",
        arch: `<form><field name="state" widget="status_badge" options="{'colors': {'done': 'warning'}}"/></form>`,
    });
    expect(".o_status_badge").toHaveClass("text-bg-warning");
});
