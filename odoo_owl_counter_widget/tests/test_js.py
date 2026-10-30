from odoo.tests import HttpCase, tagged


@tagged("post_install", "-at_install")
class TestOwlWidgetsJs(HttpCase):
    """Lance les tests hoot du module dans Chrome headless.

    Odoo ignore (skip) ce test si Chrome n'est pas installé sur la machine.
    """

    def test_hoot(self):
        self.browser_js(
            "/web/tests?headless&loglevel=2&preset=desktop&timeout=15000&filter=odoo_owl_counter_widget",
            "",
            "",
            login="admin",
            timeout=600,
            success_signal="[HOOT] Test suite succeeded",
        )
