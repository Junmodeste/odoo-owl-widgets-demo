from odoo.tests import TransactionCase, tagged


@tagged("post_install", "-at_install")
class TestInstall(TransactionCase):

    def test_module_installed(self):
        module = self.env["ir.module.module"].search([("name", "=", "odoo_owl_counter_widget")])
        self.assertEqual(module.state, "installed")

    def test_form_view_uses_widgets(self):
        arch = self.env["owl.demo.task"].get_views([(False, "form")])["views"]["form"]["arch"]
        self.assertIn('widget="counter"', arch)
        self.assertIn('widget="status_badge"', arch)

    def test_demo_data(self):
        module = self.env["ir.module.module"].search([("name", "=", "odoo_owl_counter_widget")])
        if not module.demo:
            self.skipTest("données de démo non chargées (base créée avec --without-demo)")
        tasks = self.env["owl.demo.task"].search([])
        # Une tâche de démo par état : chaque couleur de badge est visible.
        self.assertEqual(set(tasks.mapped("state")), {"draft", "in_progress", "done", "blocked"})

    def test_assets_declared(self):
        # Les fichiers JS des widgets sont bien dans le bundle backend.
        files = [path for _addon, path, *_ in self.env["ir.asset"]._get_asset_paths("web.assets_backend", {})]
        self.assertTrue(any(p.endswith("counter_field/counter_field.js") for p in files))
        self.assertTrue(any(p.endswith("status_badge_field/status_badge_field.js") for p in files))
