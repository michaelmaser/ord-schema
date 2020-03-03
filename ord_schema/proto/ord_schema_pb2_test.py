"""Tests for ord_schema.proto.ord_schema_pb2."""

from absl.testing import absltest

from ord_schema.proto import ord_schema_pb2


class OrdSchemaPb2Test(absltest.TestCase):

    def test_simple(self):
        reaction = ord_schema_pb2.Reaction()
        reaction.identifiers.add(value='C(C)Cl.Br>>C(C)Br.Cl',
                                 type='REACTION_SMILES')
        self.assertTrue(reaction.IsInitialized())
        self.assertLen(reaction.identifiers, 1)
        self.assertFalse(reaction.HasField('setup'))
        with self.assertRaisesRegex(ValueError,
                                    'Reaction has no field not_a_field'):
            reaction.HasField('not_a_field')


if __name__ == '__main__':
    absltest.main()
