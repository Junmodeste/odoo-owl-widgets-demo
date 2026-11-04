from odoo.tests import HttpCase, tagged


@tagged("post_install", "-at_install")
class TestOwlWidgetsJs(HttpCase):
    """Lance les tests QUnit du module dans Chrome headless.

    Odoo ignore (skip) ce test si Chrome n'est pas installé sur la machine.
    """

    def test_qunit(self):
        # qunit.js affiche « test successful » quand toute la suite filtrée passe.
        self.browser_js(
            "/web/tests?filter=odoo_owl_counter_widget",
            "",
            "",
            login="admin",
            timeout=600,
        )
