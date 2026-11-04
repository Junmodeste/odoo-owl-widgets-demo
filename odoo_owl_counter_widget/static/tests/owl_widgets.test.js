/** @odoo-module **/
/**
 * Tests JS (QUnit, le framework de tests unitaires d'Odoo 17).
 * Lancement : /web/tests?filter=odoo_owl_counter_widget (connecté en admin, mode debug).
 *
 * makeView monte une vraie vue avec un serveur simulé (serverData) : aucun accès à la base.
 */
import { click, getFixture } from "@web/../tests/helpers/utils";
import { makeView, setupViewRegistries } from "@web/../tests/views/helpers";

let serverData;
let target;

QUnit.module("odoo_owl_counter_widget", (hooks) => {
    hooks.beforeEach(() => {
        target = getFixture();
        // Modèle simulé, déclaré uniquement pour les tests.
        serverData = {
            models: {
                "owl.demo.task": {
                    fields: {
                        quantity: { string: "Quantity", type: "integer" },
                        state: {
                            string: "State",
                            type: "selection",
                            selection: [
                                ["draft", "Draft"],
                                ["done", "Done"],
                                ["blocked", "Blocked"],
                            ],
                        },
                    },
                    records: [{ id: 1, quantity: 3, state: "done" }],
                },
            },
        };
        setupViewRegistries();
    });

    const mountForm = (fieldArch) =>
        makeView({
            type: "form",
            resModel: "owl.demo.task",
            resId: 1,
            serverData,
            arch: `<form>${fieldArch}</form>`,
        });

    QUnit.test("counter: + and − buttons update the value", async (assert) => {
        await mountForm(`<field name="quantity" widget="counter"/>`);
        const value = () => target.querySelector(".o_counter_value").textContent.trim();
        assert.strictEqual(value(), "3");

        await click(target, ".o_counter_plus");
        assert.strictEqual(value(), "4");

        await click(target, ".o_counter_minus");
        await click(target, ".o_counter_minus");
        assert.strictEqual(value(), "2");
    });

    QUnit.test("counter: step option", async (assert) => {
        await mountForm(`<field name="quantity" widget="counter" options="{'step': 5}"/>`);
        await click(target, ".o_counter_plus");
        assert.strictEqual(target.querySelector(".o_counter_value").textContent.trim(), "8");
    });

    QUnit.test("counter: no buttons in readonly mode", async (assert) => {
        await mountForm(`<field name="quantity" widget="counter" readonly="1"/>`);
        assert.strictEqual(target.querySelector(".o_counter_value").textContent.trim(), "3");
        assert.containsNone(target, ".o_counter_field button");
    });

    QUnit.test("status_badge: label and color depend on the value", async (assert) => {
        await mountForm(`<field name="state" widget="status_badge"/>`);
        const badge = target.querySelector(".o_status_badge");
        assert.strictEqual(badge.textContent.trim(), "Done");
        assert.hasClass(badge, "text-bg-success");
    });

    QUnit.test("status_badge: colors option overrides the default", async (assert) => {
        await mountForm(
            `<field name="state" widget="status_badge" options="{'colors': {'done': 'warning'}}"/>`
        );
        assert.hasClass(target.querySelector(".o_status_badge"), "text-bg-warning");
    });
});
